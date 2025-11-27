import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Typography } from "@mui/material";

import DeveloperForm from "./Components/DeveloperForm.jsx";
import DeveloperList from "./Components/DeveloperList.jsx";

export default function App() {
  const [developers, setDevelopers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    techStack: "",
    experience: "",
  });
  const [filters, setFilters] = useState({ role: "", tech: "" });

  const fetchDevelopers = async () => {
    try {
      const params = {};
      if (filters.role) params.role = filters.role;
      if (filters.tech) params.tech = filters.tech;

      const res = await axios.get("http://localhost:3000/developers", {
        params,
      });
      setDevelopers(res.data);
    } catch (err) {
      toast.error("Failed to fetch developers");
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, [filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role || !form.techStack || !form.experience) {
      return toast.error("Please fill all fields");
    }

    try {
      const techArray = form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await axios.post("http://localhost:3000/developers", {
        ...form,
        techStack: techArray,
      });

      toast.success("Developer added successfully!");
      setForm({ name: "", role: "", techStack: "", experience: "" });
      fetchDevelopers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding developer");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Developer Directory
      </Typography>

      <DeveloperForm
        form={form}
        setForm={setForm}
        filters={filters}
        setFilters={setFilters}
        handleSubmit={handleSubmit}
      />

      <DeveloperList developers={developers} />

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}
