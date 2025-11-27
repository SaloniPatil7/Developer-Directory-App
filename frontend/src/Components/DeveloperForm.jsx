import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const roles = ["Frontend", "Backend", "Full-Stack"];

export default function DeveloperForm({
  form,
  setForm,
  filters,
  setFilters,
  handleSubmit,
}) {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <>
      {/* Add Developer Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tech Stack (comma-separated)"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          required
        />
        <TextField
          label="Experience (years)"
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit">
          Add Developer
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <TextField
          select
          label="Filter by Role"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Filter by Tech"
          name="tech"
          value={filters.tech}
          onChange={handleFilterChange}
        />

        <Button
          variant="outlined"
          onClick={() => setFilters({ role: "", tech: "" })}
        >
          Clear Filters
        </Button>
      </Box>
    </>
  );
}
