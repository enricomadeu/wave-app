export const calcularCor = (valor, opacidadePadrao) => {
	let r, g, b, a;

	if (valor <= 30) {
		// Verde
		r = 56;
		g = 146;
		b = 60;
		a = opacidadePadrao; // Opacidade proporcional ao valor
	} else if (valor <= 70) {
		// Amarelo
		r = 247;
		g = 188;
		b = 40;
		a = opacidadePadrao; // Opacidade proporcional ao valor no intervalo
	} else {
		// Vermelho
		r = 247;
		g = 65;
		b = 40;
		a = opacidadePadrao; // Opacidade proporcional ao valor no intervalo
	}

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const gerarCorAleatoria = () => {
	const letrasHex = "0123456789ABCDEF";
	let cor = "#";

	for (let i = 0; i < 6; i++) {
		cor += letrasHex[Math.floor(Math.random() * 16)];
	}

	return cor;
};
