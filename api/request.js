// api/request.js — Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, branch, semester, project, message } = req.body;

    if (!name || !email || !branch) {
      return res.status(400).json({ error: 'Name, email and branch are required' });
    }

    // In production: save to DB, send email notification, etc.
    const submission = {
      id: Date.now(),
      name,
      email,
      branch,
      semester: semester || 'Not specified',
      project: project || 'Not specified',
      message: message || '',
      submittedAt: new Date().toISOString(),
    };

    console.log('New project request:', submission);

    return res.status(200).json({
      success: true,
      message: 'Request received! We will contact you within 24 hours.',
      submissionId: submission.id,
    });
  } catch (err) {
    console.error('Request error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
