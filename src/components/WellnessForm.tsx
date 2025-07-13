import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WellnessFormData, wellnessSchema } from "../schema/wellnessSchema";
import { useAppSelector } from "../store";
import { logWellnessEntry } from "../api/wellness";

const moods = ["Happy", "Stressed", "Tired", "Focused"] as const;

const WellnessForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<WellnessFormData>({
    resolver: zodResolver(wellnessSchema),
    mode: "onTouched",
    defaultValues: {
      sleepHours: 6,
      mood: "Happy",
      notes: "",
    },
  });

  const token = useAppSelector((state) => state.auth.token);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: WellnessFormData) => {
    try {
      await logWellnessEntry(data, token!);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Something went wrong while saving your log.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Log Your Wellness
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Mood */}
        <div className="sm:col-span-1">
          <label className="block mb-1 font-medium text-gray-700">Mood</label>
          <select
            {...register("mood")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select mood</option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          {errors.mood && (
            <p className="text-sm text-red-500 mt-1">{errors.mood.message}</p>
          )}
        </div>

        {/* Sleep Duration */}
        <div className="sm:col-span-1">
          <label className="block mb-1 font-medium text-gray-700">
            Sleep Duration: {watch("sleepHours")} hrs
          </label>
          <Controller
            name="sleepHours"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                {...field}
                className="w-full"
              />
            )}
          />
          {errors.sleepHours && (
            <p className="text-sm text-red-500 mt-1">
              {errors.sleepHours.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">
            Activity Notes{" "}
            <span className="text-gray-400 text-sm">(Optional)</span>
          </label>
          <textarea
            {...register("notes")}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-indigo-500 focus:outline-none"
            maxLength={200}
          />
          <div className="text-right text-sm text-gray-500">
            {watch("notes")?.length || 0}/200 characters
          </div>
          {errors.notes && (
            <p className="text-sm text-red-500 mt-1">{errors.notes.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {isSubmitting ? "Saving..." : "Save Log"}
          </button>
        </div>

        {/* Confirmation */}
        {submitted && (
          <div className="sm:col-span-2 text-green-600 text-sm mt-2">
            Wellness log submitted successfully 🎉
          </div>
        )}
      </form>
    </div>
  );
};

export default WellnessForm;
