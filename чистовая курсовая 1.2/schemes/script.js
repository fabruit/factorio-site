document.addEventListener('DOMContentLoaded', function() {
    const imageForm = document.getElementById('imageForm');
    const gallery = document.getElementById('gallery');
    const images = [];

    if (imageForm) {
        imageForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const imageUrl = document.getElementById('imageUrl').value;
            const imageDescription = document.getElementById('imageDescription').value;
            const imageFilter = document.getElementById('imageFilter').value;

            const img = new Image();
            img.src = imageUrl;

            img.onload = function() {
                const container = document.createElement('div');
                container.className = 'image-container';
                container.setAttribute('data-filter', imageFilter);

                const link = document.createElement('a');
                link.href = `page.html?url=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(imageDescription)}&filter=${encodeURIComponent(imageFilter)}`;
                link.target = "_blank";

                img.style.width = '100%';
                img.style.height = '250px';
                img.style.objectFit = 'cover';

                link.appendChild(img);
                container.appendChild(link);
                gallery.appendChild(container);

                images.push({
                    url: imageUrl,
                    description: imageDescription,
                    filter: imageFilter
                });

                imageForm.reset();
            };

            img.onerror = function() {
                alert("Не удалось загрузить изображение. Пожалуйста, проверьте URL и попробуйте снова.");
            };
        });
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const imageUrl = urlParams.get('url');
        const imageDescription = urlParams.get('description');
        const imageFilter = urlParams.get('filter');

        if (imageUrl && imageDescription) {
            const container = document.createElement('div');
            container.className = 'image-container';
            container.setAttribute('data-filter', imageFilter);

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = imageDescription;
            img.style.width = '100%';
            img.style.height = '250px';
            img.style.objectFit = 'cover';

            const desc = document.createElement('div');
            desc.className = 'description';
            desc.textContent = imageDescription;

            const tags = document.createElement('div');
            tags.className = 'hashtags';
            tags.textContent = `Тэги: ${imageFilter}`;

            container.appendChild(img);
            container.appendChild(desc);
            container.appendChild(tags);

            const content = document.getElementById('content');
            content.appendChild(container);
        }
    }

    window.filterImages = function() {
        const selectedFilter = document.getElementById('filterSearch').value;

        const containers = document.querySelectorAll('.image-container');
        containers.forEach(container => {
            if (selectedFilter === 'All' || container.getAttribute('data-filter') === selectedFilter) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    };
});