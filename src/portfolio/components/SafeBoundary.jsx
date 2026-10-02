import { Component } from 'react';

// Aísla fallos de widgets opcionales (p. ej. la escena 3D) para no tumbar la página.
export default class SafeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('Widget opcional deshabilitado:', err?.message);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
