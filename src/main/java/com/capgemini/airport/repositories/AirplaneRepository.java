package com.capgemini.airport.repositories;

import com.capgemini.airport.models.Airplane;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Long> {
}
