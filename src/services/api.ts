export interface InvestigationResult {
  success: boolean;
  title: string;
  outcome: string;
  causes: any[];
}

export async function investigate(question: string): Promise<InvestigationResult> {
  const response = await fetch("http://localhost:5000/api/investigate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact backend");
  }

  return response.json();
}