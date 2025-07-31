export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Precise Positioning',
      description: 'Smooth and accurate playback time control with buffering support'
    },
    {
      icon: '📝',
      title: 'Time Codes',
      description: 'Add descriptive labels to different parts of video for easy navigation'
    },
    {
      icon: '🖼️',
      title: 'Frame Preview',
      description: 'Display frame previews when hovering over the timeline'
    },
    {
      icon: '📱',
      title: 'Touch Support',
      description: 'Full touch device support for mobile applications'
    },
    {
      icon: '🎨',
      title: 'Customization',
      description: 'Flexible appearance and behavior settings for the component'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Optimized code for smooth operation even with long videos'
    }
  ];

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}; 