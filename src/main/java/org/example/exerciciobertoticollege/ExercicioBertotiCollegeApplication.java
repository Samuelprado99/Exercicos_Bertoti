package org.example.exerciciobertoticollege;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
public class ExercicioBertotiCollegeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExercicioBertotiCollegeApplication.class, args);
    }

}

@RestController
@RequestMapping("/colleges")
class RestApiDemoController {
    private List<College> colleges = new ArrayList<>();

    public RestApiDemoController() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            colleges.addAll(List.of(
                    new College("Alabama", "Crimson Tide", formatter.parse("13/10/2025")),
                    new College("Georgia", "Bulldogs", formatter.parse("12/10/2025")),
                    new College("LSU", "Tigers", formatter.parse("11/10/2025")),
                    new College("Michigan", "Wolverines", formatter.parse("10/10/2025"))));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    Iterable<College> getColleges() {
        return colleges;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    Optional<College> getCollegeById(@PathVariable String id) {
        for (College c : colleges) {
            if (c.getId().equals(id)) {
                return Optional.of(c);
            }
        }
        return Optional.empty();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    College postCollege(@RequestBody College college) {
        colleges.add(college);
        return college;
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    ResponseEntity<College> putCollege(@PathVariable String id,
                                       @RequestBody College college) {
        int collegeIndex = -1;

        for (College c : colleges) {
            if (c.getId().equals(id)) {
                collegeIndex = colleges.indexOf(c);
                colleges.set(collegeIndex, college);
            }
        }

        return (collegeIndex == -1) ? new ResponseEntity<>(postCollege(college), HttpStatus.CREATED)
                : new ResponseEntity<>(college, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/{id}")
    College deleteCollege(@PathVariable String id) {
        College college = new College();

        for (College c : colleges) {
            if (c.getId().equals(id)) {
                college = c;
            }
        }
        colleges.removeIf(c -> c.getId().equals(id));
        return college;
    }
}

class College {
    private final String id;
    private String nome;
    private String mascote;
    private Date fundacao;

    public College() {
        this.id = UUID.randomUUID().toString();
        this.nome = "Desconhecida";
        this.mascote = "Desconhecido";
        this.fundacao = new Date();
    }

    public College(String id, String nome, String mascote, Date fundacao) {
        this.id = id;
        this.nome = nome;
        this.mascote = mascote;
        this.fundacao = fundacao;
    }

    public College(String nome, String mascote, Date fundacao) {
        this(UUID.randomUUID().toString(), nome, mascote, fundacao);
    }

    public String getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMascote() {
        return mascote;
    }

    public void setMascote(String mascote) {
        this.mascote = mascote;
    }

    public Date getFundacao() {
        return fundacao;
    }

    public void setFundacao(String fundacao) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        try {
            this.fundacao = formatter.parse(fundacao);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
