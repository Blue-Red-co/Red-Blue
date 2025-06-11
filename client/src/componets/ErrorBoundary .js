import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    toast.error("Something went wrong! Please try again.");
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops! An error occurred.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;