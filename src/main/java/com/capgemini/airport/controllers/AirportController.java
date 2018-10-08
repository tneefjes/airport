package com.capgemini.airport.controllers;

import com.capgemini.airport.models.Airport;
import com.capgemini.airport.repositories.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/airport")
public class AirportController {

    @Autowired
    AirportRepository airportRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Airport> getAll() {
        return airportRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Airport create(@RequestBody Airport newAirport) {
        return airportRepository.save(newAirport);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public Airport updateById(@PathVariable long id, @RequestBody Airport newAirport) {
        Optional<Airport> airport = airportRepository.findById(id);
        if (!airport.isPresent()) {
            throw new RuntimeException();
        } else {
            Airport oldAirport = airport.get();
            oldAirport.setName(newAirport.getName());
            return airportRepository.save(oldAirport);
        }
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable long id) {
        airportRepository.deleteById(id);
    }
}
