import axios from "axios";

export const getComments = async (snippet_id: string, page: number = 1) => {
  try {
    const results = await axios.get(
      `/api/comments?snippet_id=${snippet_id}&page=${page}`
    );
    return results.data || [];
  } catch (error) {
    return [];
  }
};
