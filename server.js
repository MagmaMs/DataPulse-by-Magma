require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const trackRoutes = require("./routes/track")
app.use("/api/track", trackRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const supabase = require("./utils/supabaseClient")

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("projects").select("*")
  res.json({ data, error })
})
