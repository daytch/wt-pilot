import api from "./api";

export function POST(url, body) {
  try {
    return api.post(url, body);
  } catch (error) {
    return { error: error };
  }
}

export function GET(url) {
  try {
    return api.get(url);
  } catch (error) {
    return { error: error };
  }
}

export function PUT(url, body) {
  try {
    return api.put(url, body);
  } catch (error) {
    return { error: error };
  }
}

export function DELETE(url) {
  try {
    return api.delete(url);
  } catch (error) {
    return { error: error };
  }
}
