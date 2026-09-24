package com.cicd.notes_app.service;

import com.cicd.notes_app.model.Note;
import com.cicd.notes_app.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public Note create(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getAll() {
        return noteRepository.findAll();
    }

    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}
