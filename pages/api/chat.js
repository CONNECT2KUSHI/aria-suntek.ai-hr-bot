export default function handler(req, res) {
  const { message } = req.body;
  const query = message.toLowerCase();

  let reply = "Try asking about leave, onboarding, claims or maternity.";

  if (query.includes("leave")) {
    reply = `
Leave Policy:

• Privilege Leave (PL): 12 days/year
• Sick Leave (SL): 6 days/year
• Casual Leave (CL): 6 days/year

👉 Apply 7 days in advance
👉 Sick leave: inform within 2 hours
`;
  }

  else if (query.includes("maternity")) {
    reply = `
Maternity Leave:

• 26 weeks (first 2 children)
• 12 weeks (after that)
• Paid leave
`;
  }

  else if (query.includes("claim") || query.includes("expense")) {
    reply = `
Expense Claim:

1. Go to HRMS
2. Click New Claim
3. Upload invoice
4. Submit before 20th
`;
  }

  else if (query.includes("onboarding")) {
    reply = `
Onboarding:

• Get credentials
• Complete profile
• Meet manager
`;
  }

  res.status(200).json({ reply });
}
