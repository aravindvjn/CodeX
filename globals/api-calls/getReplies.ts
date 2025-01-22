import axios from "axios";

export const getReplies = async (comment_id: string | number, page: number = 1) => {
  try {
    const results = await axios.get(
      `/api/comments?comment_id=${comment_id}&page=${page}`
    );
    console.log(results);
    return results.data || [];
  } catch (error) {
    return [];
  }
};
