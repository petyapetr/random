// store of some kind for all of the jobs
const allJobsList = new Map;

// starts a job and returns it's Id
function jobs(index) {
	const id = Math.round(Math.random() * 100000000);
	run(id, index);
	return id;
}

// excecutes a job
function run(id, index) {
	allJobsList.set(id, {index, 'status': 'working'});
	const getTimeMs = () => {
		const value = Math.ceil(Math.random() * 30000);
		const time = value >= 5000 && value <= 60000 ? value : getTimeMs();
		return time;
	};
	const timeMs = getTimeMs();
	setTimeout(() => {
		const result = `${index}: ${id} -- done!`;
		allJobsList.set(id, {index, 'status': 'finish', timeMs, result});
	}, timeMs);
}

// starts "n" number of jobs
function runJobs(times) {
	const results = [];
	for (let i = 0; i <= times; i++) {
		const id = jobs(i);

		function waitToGetResults() {
			const timer = setInterval(() => {
				const singleJob = allJobsList.get(id);
				if (singleJob.status === 'finish') {
					console.log(`Job №${singleJob.index} is over in ${singleJob.timeMs} ms`);
					results.push(singleJob.result);
					clearInterval(timer);
				}
			}, 5000);
		}

		waitToGetResults(id);
	}

	return results;
}

const n = Math.ceil(Math.random() * 20) + 1;
const results = runJobs(n);

console.log(allJobsList);
setTimeout(() => console.log(results), 60000);