import React from "react";
import { Grid, Card, CardContent, Typography, Box, Chip } from "@mui/material";

export default function DeveloperList({ developers }) {
  return (
    <Grid container spacing={2}>
      {developers.map((dev) => (
        <Grid item xs={12} md={6} key={dev.id}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="h6">{dev.name}</Typography>
              <Typography color="text.secondary">{dev.role}</Typography>
              <Typography>Experience: {dev.experience} yrs</Typography>
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {dev.techStack.map((tech, idx) => (
                  <Chip key={idx} label={tech} color="primary" size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
