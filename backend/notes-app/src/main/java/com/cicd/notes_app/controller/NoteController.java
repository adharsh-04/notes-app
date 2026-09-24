package com.cicd.notes_app.controller;

import com.cicd.notes_app.model.Note;
import com.cicd.notes_app.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class NoteController {
    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note create(@RequestBody Note note) {
        return noteService.create(note);
    }

    @GetMapping
    public List<Note> getAll() {
        return noteService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        noteService.delete(id);
    }
}
