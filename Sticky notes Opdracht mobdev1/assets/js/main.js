function ready(cb) {
    /in/.test(document.readyState)
        ? setTimeout(ready.bind(null, cb), 90)
        : cb();
};

ready(function () {

    var App = {
        "init": function () {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext
        },
        "testApplicationDbContext": function () {

// GetStickyNotes

let stickyNotes = this._applicationDbContext.getStickyNotes();
var stickynoteElement = document.querySelector('.stickynote');
if (stickyNotes === null) {
    stickynoteElement.innerHTML += "---------------------";
}
else {
    stickyNotes.forEach(function (element) {
        console.log(element);
        stickynoteElement.innerHTML +=
            `
            <div>
                <div>
                    <div>
                        <span>${element.message}</span>
                        <p>ID : ${element.id}</p>
                        <p>Modified : ${element.modifiedDate}</p>
                        <p>Deleted : ${element.deletedDate}</p>
                        <form>
                            <button class="deleteSticky" id="${element.id}">Remove</button> 
                            ${element.deletedDate === null ? `<button class="softDeleteSticky" id="${element.id}">SoftDelete</button>`
                : `<button class="softUnDeleteSticky" id="${element.id}">SoftUnDelete</button>`}
                            <button class="updateSticky" id="${element.id}" data="${element.message}">Modify</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }, this);
}
// Create StickyNote

            document.getElementById("createStickyNote").addEventListener("click", createStickyNote);
            function createStickyNote() {
                let value = document.getElementById("createStickyNoteValue").value;
                let newSticky = new StickyNote();
                newSticky.message = value;
                ApplicationDbContext.addStickyNote(newSticky);
            }
            
// Delete StickyNote 

            var deleteSticky = document.querySelectorAll('.deleteSticky');
            for (var i = 0; i < deleteSticky.length; i++) {
                deleteSticky[i].addEventListener('click', function (event) {
                var id = parseInt(this.id);
                const deleted = ApplicationDbContext.deleteStickyNoteById(id);
                });
            }

// Soft Delete Sticky Note By Id

            var softDeleteSticky = document.querySelectorAll('.softDeleteSticky');
            for (var i = 0; i < softDeleteSticky.length; i++) {
                softDeleteSticky[i].addEventListener('click', function (event) {
                var id = parseInt(this.id);
                const softDeleted = ApplicationDbContext.softDeleteStickyNoteById(id);
                });
            }

// Soft UnDelete StickyNote By Id

            var softUnDeleteSticky = document.querySelectorAll('.softUnDeleteSticky');
            for (var i = 0; i < softUnDeleteSticky.length; i++) {
                softUnDeleteSticky[i].addEventListener('click', function (event) {
                var id = parseInt(this.id);
                 const Undeleted = ApplicationDbContext.softUnDeleteStickyNoteById(id);
                });
            }

// Modify StickyNote

var updateSticky = document.querySelectorAll('.updateSticky');
for (var i = 0; i < updateSticky.length; i++) {
    updateSticky[i].addEventListener('click', function (event) {
        let message = prompt("Modify here");
            var id = parseInt(this.id);
            sn = ApplicationDbContext.getStickyNoteById(id);
            sn.message = message;
            const modified = ApplicationDbContext.updateStickyNote(sn);
    });
}
        }
    };
    App.init(); // Initialize the application
});