(function () {

	const contents = document.querySelectorAll(".tab-content");
	const tabLinks = document.querySelectorAll(".tab-links");
	const allInputs = document.querySelectorAll( "input" );
	const date = document.querySelector(".year");

	onLoading();

	function onLoading() {

		date.textContent = (new Date()).getFullYear();

		allInputs.forEach(input => {
			input.addEventListener("focusin", e => {
				e.currentTarget.parentNode
					.querySelector("label").classList
					.add("active");
			});
			input.addEventListener("focusout", e => {
				const ele = e.currentTarget;
				if (!ele.value) {
					ele.parentNode.querySelector("label")
						.classList.remove("active");
				};
			});
		});

		tabLinks.forEach(tabLink => {
			tabLink.addEventListener("click", e => {

				tabLinks.forEach(element => {
					element.classList.remove("active");
				});

				contents.forEach(element => {
					element.style.display = "none";
				});

				e.currentTarget.classList.add("active");
				const id = e.currentTarget.id;
				const opened = document.querySelector(`#${id}-menu`);
				opened.style.display = "flex";

				startMatch(id);

			});
		});
		window.onload = document.querySelector("#pvc").click();

		
	};
})();