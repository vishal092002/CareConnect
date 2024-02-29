import React from "react";
import Dashboard from "../pages/Dashboard";
import { render, screen } from "@testing-library/react";

test('renders Dashboard', () => {
    render(<Dashboard />);
});

test('check for navbar', () => {
    render(<Dashboard />);

    expect(screen.getByText(/ConnectiveCare/)).toBeInTheDocument();
});

test('screen read example', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/the landing page/)).toBeInTheDocument();
});