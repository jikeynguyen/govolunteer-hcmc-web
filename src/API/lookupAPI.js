const API_URL = "https://api-govolunteer.onrender.com/lookup";

const searchCertificates = async (fullName, citizenId) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, citizenId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Không thể tra cứu.");
  }

  return data.certificates || [];
};

export default { searchCertificates };
