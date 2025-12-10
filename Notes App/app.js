import express from "express";

const app = express();

app.use(express.json());

let notes = [];
let nextID = 1;

app.post("/post", (req, res) => {
    // id
    // title
    // content
    // timestamps
    const { title, content } = req.body;

    if(!title || !content){
        return res.status(400).json({
            success: false,
            message: "Title or content is missing, post request failed"
        })
    }

    let user = {
        "id": nextID++,
        "title": title,
        "content": content,
        "timestamps": new Date().toISOString(),
    }

    notes.push(user);

    return res.status(200).json({
        Data: user,
        mesage: "Notes posted successfully"
    })
})

app.delete("/deleteAllNotes", (req, res) => {
    notes.length = 0;
    nextID = 1;

    res.status(200).json({
        message: "All notes deleted",
        success: true,
        Notes: notes
    })
})

app.get("/getAllPost", (req, res) => {

    if(notes.length == 0){
        return res.status(400).json({
            success: false,
            message: "No notes exist"
        })
    }

    return res.status(200).json({
        success: true,
        Notes: notes
    })
})

app.patch("/change", (req, res) => {
    const { id, newContent, newTitle } = req.body;

    if(!newContent && !newTitle){
        return res.status(400).json({
            success: false,
            message: "No newContent or newTitle sent to update"
        })
    }

    const updateNotes = notes.map((note) => {
        if(note.id == id){
            note.title = newTitle;
            note.content = newContent;
            return res.status(200).json({
                success: true,
                message: "Note change successfully",
                ChangeNote: note
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Note with the provided ID does not exist"
            })
        }
    })

})

app.delete("/deleteSpecific", (req, res) => {
    const { id } = req.body;

    notes = notes.filter((note) => {
        return note.id != id;
    })

    return res.status(200).json({
        success: true,
        message: "Note successfully deleted"
    })
})

app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
})