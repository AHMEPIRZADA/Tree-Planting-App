"use client";

export default function TreeForm({
  location,
  formData,
  setFormData,
  onSave,
  ready,
}) {
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.userName.trim() || !formData.treeName.trim()) {
      return;
    }

    onSave();
  }

  return (
    <section className="form-card">
      <h2>Plant a Tree</h2>

      {!location ? (
        <div className="empty-state">
          <span className="empty-icon">📍</span>
          <h3>Select a location</h3>
          <p>
            Click anywhere on the map. Latitude and longitude
            will appear here automatically.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="selected-note">📍 Location selected</p>

          <div className="field">
            <label htmlFor="userName">Your Name</label>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="e.g. Hammad"
              value={formData.userName}
              onChange={handleChange}
              maxLength={80}
              autoComplete="name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="treeName">Tree Name</label>
            <input
              id="treeName"
              name="treeName"
              type="text"
              placeholder="e.g. Neem"
              value={formData.treeName}
              onChange={handleChange}
              maxLength={80}
              required
            />
          </div>

          <div className="coordinate-grid">
            <div className="field">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="text"
                value={location.lat.toFixed(6)}
                readOnly
              />
            </div>

            <div className="field">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="text"
                value={location.lng.toFixed(6)}
                readOnly
              />
            </div>
          </div>

          <button
            className="plant-button"
            type="submit"
            disabled={
              !ready ||
              !formData.userName.trim() ||
              !formData.treeName.trim()
            }
          >
            🌳 Plant Tree
          </button>

          <p className="form-help">
            Click another spot on the map to change the location.
          </p>
        </form>
      )}
    </section>
  );
}