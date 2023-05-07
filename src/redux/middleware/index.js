import api from "./api"
import apiRegistrasion from "./apiRegistrasion"

export function POSTRegistrasion(url, body) {
  try {
    return apiRegistrasion.post(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  } catch (error) {
    return { error: error }
  }
}

export function POST(url, body) {
  try {
    return api.post(url, body)
  } catch (error) {
    return { error: error }
  }
}

export function GET(url) {
  try {
    return api.get(url)
  } catch (error) {
    return { error: error }
  }
}

export function PUT(url, body) {
  try {
    return api.put(url, body)
  } catch (error) {
    return { error: error }
  }
}

export function DELETE(url) {
  try {
    return api.delete(url)
  } catch (error) {
    return { error: error }
  }
}
