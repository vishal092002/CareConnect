import React from "react";
import SignIn from "../pages/SignIn";
import { render, screen } from "@testing-library/react";

test('renders SignIn', () => {
    render(<SignIn />);
});

test('screen read example', () => {
    render(<SignIn />);
    
    expect(screen.getByText(/signin page/)).toBeInTheDocument();
})

test('check for navbar', () => {
    render(<SignIn />);

    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
});