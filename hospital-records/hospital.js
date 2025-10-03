
const readline = require("readline");

let patients = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateAverageAge(patients) {
    if (patients.length === 0) return 0;
    const total = patients.reduce((sum, p) => sum + p.age, 0);
    return total / patients.length;
}

function filterByDiagnosis(patients, diagnosis) {
    return patients.filter(p => p.diagnosis.toLowerCase() === diagnosis.toLowerCase());
}

function findOldestPatient(patients) {
    return patients.reduce((oldest, p) => (p.age > oldest.age ? p : oldest), patients[0]);
}

function groupByTreatmentPlan(patients) {
    return patients.reduce((groups, p) => {
    if (!groups[p.treatmentPlan]) {
        groups[p.treatmentPlan] = [];
    }
    groups[p.treatmentPlan].push(p);
    return groups;
    }, {});
}

function simulateFetchingNewRecords(existing, newRecords) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    return Promise.all(
    newRecords.map(async record => {
      const wait = Math.floor(Math.random() * 2000) + 500;
        await delay(wait);
        console.log('Fetched asynchronously: ${record.name}');
        return record;
    })
    ).then(fetched => [...existing, ...fetched]);
}

function showMenu() {
    console.log("\n--- Hospital Patient Records ---");
    console.log("1. Add Patient");
    console.log("2. Show All Patients");
    console.log("3. Calculate Average Age");
    console.log("4. Filter by Diagnosis");
    console.log("5. Find Oldest Patient");
    console.log("6. Group by Treatment Plan");
    console.log("7. Simulate Fetching New Patients");
    console.log("0. Exit");
    rl.question("Choose an option: ", handleMenu);
}

async function handleMenu(choice) {
    switch (choice) {
    case "1":
    rl.question("Enter name: ", name => {
        rl.question("Enter age: ", age => {
            rl.question("Enter diagnosis: ", diagnosis => {
                rl.question("Enter treatment plan: ", treatment => {
                    patients.push({
                    name,
                    age: parseInt(age),
                    diagnosis,
                    treatmentPlan: treatment
                });
                console.log("✅ Patient added!");
                showMenu();
                });
            });
        });
        });
        break;

    case "2":
        console.table(patients);
        showMenu();
        break;

    case "3":
        console.log("Average Age:", calculateAverageAge(patients).toFixed(2));
        showMenu();
        break;

    case "4":
    rl.question("Enter diagnosis to filter: ", d => {
        console.table(filterByDiagnosis(patients, d));
        showMenu();
    });
    break;

    case "5":
        if (patients.length === 0) {
        console.log("No patients yet.");
        } else {
        console.log("Oldest Patient:", findOldestPatient(patients));
    }
    showMenu();
    break;

    case "6":
        console.log(groupByTreatmentPlan(patients));
        showMenu();
        break;

    case "7":
        const newRecords = [
        { name: "Frank", age: 45, diagnosis: "Flu", treatmentPlan: "Rest & hydration" },
        { name: "Grace", age: 82, diagnosis: "Pneumonia", treatmentPlan: "Antibiotics" },
        { name: "Hank", age: 33, diagnosis: "Allergy", treatmentPlan: "Antihistamines" }
    ];
    console.log("Fetching new records asynchronously...");
    patients = await simulateFetchingNewRecords(patients, newRecords);
    console.log("✅ New patients added.");
    showMenu();
    break;

    case "0":
        console.log("Exiting... Goodbye!");
        rl.close();
        break;

    default:
        console.log("Invalid choice.");
        showMenu();
    }
}

showMenu();