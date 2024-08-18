import api from "./axiosConfig";
//UTILITY FUNCTIONS
/**
 * Checks for errors from json-server response
 * @param {Promise<array>} response: response from json-server
 */
export const handleServerError = (response) => {
  if (response.status === 500) {
    throw new Error("Server error");
  } else if (response.status === 400) {
    throw new Error("Item not found");
  }
};
/**
 * Extracts filters from the query parameters and categorizes them into likeFilters, dateFilters, and remainingParams.
 *
 * @param {object} queryParams - An object containing the query parameters to filter with.
 * @returns {object} An object containing likeFilters, dateFilters, and remainingParams.
 */
export const extractFilters = (queryParams) => {
  const likeFilters = {};
  const dateFilters = {};
  const remainingParams = {};

  Object.entries(queryParams).forEach(([key, value]) => {
    if (key.includes("_like")) {
      likeFilters[key] = value;
    } else if (
      key.includes("dueDate") ||
      key.includes("createdAt") ||
      key.includes("updatedAt") ||
      key.includes("completedAt")
    ) {
      dateFilters[key] = value;
    } else {
      remainingParams[key] = value;
    }
  });

  return { likeFilters, dateFilters, remainingParams };
};

/**
 * Applies like and date filters to the provided data.
 *
 * @param {Array} data - The dataset to be filtered.
 * @param {object} likeFilters - The filters for _like search.
 * @param {object} dateFilters - The filters for date matching.
 * @returns {Array} The filtered data.
 */
export const applyFilters = (data, likeFilters, dateFilters) => {
  // Apply like filters
  if (Object.entries(likeFilters).length > 0) {
    data = data.filter((item) =>
      Object.entries(likeFilters).every(([key, value]) =>
        String(item[key.replace("_like", "")])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  }

  // Apply date filters
  if (Object.entries(dateFilters).length > 0) {
    data = data.filter((item) =>
      Object.entries(dateFilters).every(([key, value]) => {
        const itemDate = new Date(item[key]);
        const filterDate = new Date(value);

        // Check if Item date is the same as filtered date
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      })
    );
  }

  return data;
};

