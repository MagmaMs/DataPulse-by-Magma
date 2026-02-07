const supabase = require("../utils/supabaseClient")

exports.trackEvent = async (req, res) => {
    const { apikey } = req.params
    const payload = req.body

    try {
        const { data: project, error } = await supabase
        .from("projects")
        .select("*")
        .eq("api_key", apikey)
        .single()

        if (error || !project) {
            return res.status(401).json({ error: "Invalid API key" })
        }

        await supabase.from("events").insert({
            project_id: project.id,
            payload
        })

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
}
