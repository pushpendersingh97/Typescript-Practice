/// <reference path="Components/project-list.ts" />
/// <reference path="Components/project-input.ts" />

namespace App {
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}
