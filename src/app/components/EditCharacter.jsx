"use client";

import { useState } from "react";

export default function EditCharacterForm({ initialData, id }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      action={`/character/${id}?submit=true`}
      method="POST"
      className="grid grid-cols-2 gap-4 mt-6"
    >
      <div>
        <label className="block font-semibold">Character Name:</label>
        <input
          type="text"
          name="char_name"
          value={formData.char_name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div>
        <label className="block font-semibold">Race:</label>
        <input
          type="text"
          name="race"
          value={formData.race}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div>
        <label className="block font-semibold">Class:</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div>
        <label className="block font-semibold">Background:</label>
        <input
          type="text"
          name="background"
          value={formData.background}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div>
        <label className="block font-semibold">Level:</label>
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div>
        <label className="block font-semibold">XP:</label>
        <input
          type="number"
          name="xp"
          value={formData.xp}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />
      </div>
      <div className="col-span-2 flex justify-between">
        <button type="submit" className="btn btn-success">Save Changes</button>
        <a href={`/character/${id}`} className="btn btn-secondary">Cancel</a>
      </div>
    </form>
  );
}
