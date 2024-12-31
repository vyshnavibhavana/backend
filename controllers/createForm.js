const Folder = require('../models/createFolder');
const Data = require('../models/formModel');

const getUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId, 'userId');

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Fetch all folders and form data for the user
    const folders = (await Folder.find({ userId }).lean()) || []; // Ensure folders is an array
    const data = (await Data.find({ userId }).lean()) || []; // Ensure data is an array

    // Calculate stats
    const totalViews = folders.reduce((sum, folder) => sum + (folder.views || 0), 0);
    const totalStarts = folders.reduce((sum, folder) => sum + (folder.starts || 0), 0);
    const totalCompleted = data.filter((form) => form.completed).length;
    const completionRate = totalStarts > 0 ? ((totalCompleted / totalStarts) * 100).toFixed(2) : 0;

    // Prepare submissions for the table
    const submissions = data.map((entry) => ({
      submittedAt: entry.createdAt,
      ...entry?.formData?.reduce((acc, field) => {
        acc[field.label] = field.value; // Flatten form data
        return acc;
      }, {}),
    }));

    // Prepare response
    res.status(200).json({
      userId,
      stats: {
        views: totalViews,
        starts: totalStarts,
        completed: totalCompleted,
        completionRate: `${completionRate}%`,
      },
      submissions,
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};

module.exports = {
  getUserAnalytics,
};
