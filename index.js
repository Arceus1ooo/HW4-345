var request = require('request');

const chalk  = require('chalk');

var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
//var urlRoot = "https://api.github.ncsu.edu";

var userId = "yy2111";
var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if( !config.token )
{
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));


if (process.env.NODE_ENV != 'test')
{
	(async () => {
		await listAuthenicatedUserRepos();
		await listBranches(userId, "345");
		await createRepo(userId, "newrepo_test");
		//await createIssue(userId, "newrepo", "test issue");
		//await enableWikiSupport(userId,"newrepo_wiki");

	})()
}

function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

async function getUser()
{
	let options = getDefaultOptions("/user", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {

			resolve( JSON.parse(body).login );
		});
	});
}

function listAuthenicatedUserRepos()
{
	let options = getDefaultOptions("/user/repos?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if( error )
			{
				console.log( chalk.red( error ));
				reject(error);
				return; // Terminate execution.
			}

			console.log("Printing all repos of the current user:");
			var obj = JSON.parse(body);
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log( name );
			}

			// Return object for people calling our method.
			resolve( obj );
		});
	});

}

// 1. Write code for listBranches in a given repo under an owner. See list branches
async function listBranches(owner,repo)
{
	//let options = getDefaultOptions(`/repos/joomla/joomla-cms/branches`, "GET");
	let options = getDefaultOptions(`/repos/${owner}/${repo}/branches`, "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {

			if( error )
			{
				console.log( chalk.red( error ));
				reject(error);
				return; // Terminate execution.
			}

			console.log(" ");
			console.log("Listing all branches of the current user's repo:");
			var obj = JSON.parse(body);
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log( name );
			}
			// console.debug( options );
			//resolve( JSON.parse(body) );
			resolve(obj);
			
		});
	});
}

// 2. Write code to create a new repo
async function createRepo(owner,repo)
{
	let options = getDefaultOptions(`/user/repos?name=${repo}`, "POST");

	// Send a http request to url and specify a callback that will be called upon its return.
	request.post('https://api.github.com/user/repos', {
		json: {
		  name: repo,
		  description: 'test new repo',
		},
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	  }, (error, res, body) => {
		if (error) {
		  console.error(error);
		  return;
		}
		console.log(" ");
		console.log("New repo created:");
			
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body);
	  })

}
// 3. Write code for creating an issue for an existing repo.
async function createIssue(owner,repo, issueName)
{
	//let options = getDefaultOptions(`/${repo}/issues`, "POST");

	// Send a http request to url and specify a callback that will be called upon its return.
	request.post(`https://api.github.com/repos/${owner}/${repo}/issues`, {
		json: {
		  title: issueName,
		  body: 'test issueBody',
		  labels: ['bug']
		},
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	  }, (error, res, body) => {
		if (error) {
		  console.error(error);
		  return;
		}
		
		console.log(" ");
		console.log("New issue created:");
		
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body);
	  })
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(owner,repo)
{
	//let options = getDefaultOptions(`/repos/${owner}/${repo}`, "PATCH");

	// Send a http request to url and specify a callback that will be called upon its return.
	request.post(`https://api.github.com/repos/${owner}/${repo}`, {
		json: {
		  name: repo,
		  description: 'update wiki page',
		  has_wiki: true
		},
		headers: {
			"User-Agent": "ssw345-REST-lab",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	  }, (error, res, body) => {
		if (error) {
		  console.error(error);
		  return;
		}
		
		console.log(" ");
		console.log("Wiki enabled for repo:");
			
		console.log(`statusCode: ${res.statusCode}`);
		console.log(body);
	  })
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;


