const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function rewrite(title, contents, references) {
  if (!title || !contents || contents.length === 0) {
    throw new Error("Required parameter missing: Title or Content sources are empty.");
  }

  const referencelist = (Array.isArray(references) && references.length > 0) 
    ? references.join("\n") 
    : "No URLs provided";

  const referenceContentSection = contents
    .map((text, index) => `### Reference Content ${index + 1}:\n${text}`)
    .join("\n\n");

  const prompt = `You are a professional technical writer. Rewrite an article entitled "${title}" 

### Style Guidelines:
- Use the style, structure, and depth similar to the following reference articles.
- Do NOT copy sentences. Create original content.
- Make it clear, well-structured, and beginner-friendly.
- Use Markdown for formatting (headers, bullet points, etc.).

${referenceContentSection}

### Final Task:
At the end, add a section titled "References" and list the following URLs:
${referencelist}`;

  try {
    const completechat = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", 
      temperature: 0.7,
      max_tokens: 4096,
    });
    
    return completechat.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { rewrite };