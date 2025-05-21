package org.example.exerciciobertoticollege;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Testes do sistema de gerenciamento do time universitário "Bertoti College Warriors"
 * Simula o carregamento do sistema base da aplicação.
 */
@SpringBootTest
class CollegeTeamSystemTests {

	@Test
	@DisplayName("🏈 Sistema carregado com sucesso - Preparar para o jogo!")
	void contextLoads() {
		// Se a aplicação carregar sem erros, o time está pronto pro kickoff! 🎉
	}
}
