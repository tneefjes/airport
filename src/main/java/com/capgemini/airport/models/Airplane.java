package com.capgemini.airport.models;

import javax.persistence.*;

@Entity
public class Airplane {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String manufacturer;
    private String type;
    private int fuel;
    @ManyToOne(cascade = CascadeType.ALL)
    private Airport location;

    public Airplane() {};

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getFuel() {
        return fuel;
    }

    public void setFuel(int fuel) {
        this.fuel = fuel;
    }

    public Airport getLocation() {
        return location;
    }

    public void setLocation(Airport location) {
        this.location = location;
    }
}
