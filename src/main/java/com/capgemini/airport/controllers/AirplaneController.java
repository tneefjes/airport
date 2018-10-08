package com.capgemini.airport.controllers;

import com.capgemini.airport.models.Airplane;
import com.capgemini.airport.repositories.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/airplane")
public class AirplaneController {

    @Autowired
    AirplaneRepository airplaneRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Airplane> getAll() {
        return airplaneRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Airplane create(@RequestBody Airplane newAirplane) {
        newAirplane.setFuel(5);
        return airplaneRepository.save(newAirplane);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public Airplane updateById(@PathVariable long id, @RequestBody Airplane newAirplane) {
        Optional<Airplane> airplane = airplaneRepository.findById(id);
        if (!airplane.isPresent()) {
            throw new RuntimeException();
        } else {
            Airplane oldAirplane = airplane.get();
            oldAirplane.setFuel(newAirplane.getFuel());
            return airplaneRepository.save(oldAirplane);
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable long id) {
        airplaneRepository.deleteById(id);
    }
}
