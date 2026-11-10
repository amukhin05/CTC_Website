(() => {
    const list = document.getElementById('meeting-list');
    const button = document.querySelector('.meeting-toggle');
    if (!list || !button) return;

    const meetings = Array.from(list.querySelectorAll(':scope > .content-card'));
    const initialCount = 5;
    const batchSize = 10;
    let visibleCount = Math.min(initialCount, meetings.length);

    function update() {
        meetings.forEach((meeting, index) => {
            meeting.hidden = index >= visibleCount;
        });
        button.hidden = meetings.length <= initialCount;
        button.textContent = visibleCount < meetings.length ? 'See more' : 'See less';
    }

    button.addEventListener('click', () => {
        const collapsing = visibleCount === meetings.length;
        visibleCount = collapsing
            ? initialCount
            : Math.min(visibleCount + batchSize, meetings.length);
        update();
        if (collapsing) button.scrollIntoView({ block: 'nearest' });
    });

    update();
})();
