// --------------------------------------DB_MODELS_CONFIG
const { mongoose } = require('./db.js');
const Schema = mongoose.Schema;

// --------------------------------------SCHEMA
const TrendingGitReposSchema = new Schema(
	{
		full_name: {
			type: String,
			required: true,
			unique: true,
		},
		git_id: {
			type: Number,
			required: true,
			unique: true,
		},
		owner_login: {
			type: String,
			required: true,
			unique: true,
		},
		html_url: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		stargazers_count: {
			type: Number,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

// --------------------------------------MODELS
const TrendingGitRepos = mongoose.model('TrendingGitRepos', TrendingGitReposSchema);

// --------------------------------------EXPORT
module.exports = { TrendingGitRepos, mongoose };