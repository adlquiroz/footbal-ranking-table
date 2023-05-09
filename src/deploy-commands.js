const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('calificados').setDescription('Equipos calificados Liga MX'),

	new SlashCommandBuilder().setName('tabla_general').setDescription('Tabla general Liga MX').addSubcommand(subcommand =>
		subcommand
			.setName('equipo')
			.setDescription('tabla General')
			.addStringOption(option => option.setName('equipo').setDescription('Nombre del equipo a consultar'))),
	new SlashCommandBuilder().setName('lideres_de_goleo').setDescription('Goleadores por equipo'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);