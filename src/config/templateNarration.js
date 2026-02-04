/**
 * Template Narration Configuration
 * Copy this file and modify for your new diagram
 */

export const templateNarrationSteps = [
  {
    title: "Component 1",
    speechTitle: "Component One",
    description: "Description of what this component does in the system architecture.",
    speechDescription: "This component handles the primary functionality of the system.",
    icon: "component1.svg", // Icon file in public/assets/img/Icons/
    position: { x: 400, y: 500 }, // Center position for narration bubble
    highlights: [
      { x: 405, y: 490, width: 160, height: 100 } // Highlight rectangle coordinates
    ]
  },
  {
    title: "Component 2", 
    speechTitle: "Component Two",
    description: "Description of the second component and its role.",
    speechDescription: "This component provides secondary functionality and integration.",
    icon: "component2.svg",
    position: { x: 600, y: 300 },
    highlights: [
      { x: 605, y: 290, width: 120, height: 80 }
    ]
  },
  {
    title: "Data Flow",
    speechTitle: "Data Flow Between Components",
    description: "Shows how data moves between different system components.",
    speechDescription: "Data flows from the frontend through the API gateway to the backend services.",
    icon: "flow.svg",
    position: { x: 500, y: 400 },
    highlights: [
      { x: 405, y: 490, width: 160, height: 100 },
      { x: 605, y: 290, width: 120, height: 80 }
    ]
  }
  // Add more steps as needed...
]

// Optional: Add metadata
export const templateMetadata = {
  projectName: "Template Project",
  totalSteps: templateNarrationSteps.length,
  estimatedDuration: "2-3 minutes",
  difficulty: "Beginner"
}
