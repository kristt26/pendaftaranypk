angular
	.module('guest.controller', [])
	.controller('guestController', guestController)
	.controller('guestHomeController', guestHomeController)
	.controller('informasiController', informasiController)
	.controller('pengumumanController', pengumumanController)
	.controller('daftarController', daftarController)
	.controller('detailController', detailController);

function guestController($scope, $state) {}

function guestHomeController($scope, ContentService, $sce, TahunAjaranService) {
	ContentService.get().then((result) => {
		$scope.pengumuman = result.filter((x) => x.type == 'pengumuman');
		$scope.informasi = result.filter((x) => x.type == 'informasi');
		var info = angular.copy(result[0]);
		info.content = $sce.trustAsHtml(info.content);
		$scope.selectedContent = info;

		TahunAjaranService.get().then((result) => {
			$scope.taActive = result.find((x) => x.status);
		});
	});
}

function informasiController($scope, $state) {}
function pengumumanController($scope, $state) {}
function daftarController($scope, $state) {
	$scope.steppers = [
		{ selected: true, idstepper: 1, name: 'Biodata', complete: false },
		{ selected: false, idstepper: 2, name: 'Prestasi', complete: false },
		{ selected: false, idstepper: 3, name: 'Orang Tua', complete: false },
		{ selected: false, idstepper: 4, name: 'Catatan Lain', complete: false },
		{ selected: false, idstepper: 5, name: 'Catatan Apa Kek', complete: false }
	];

	$scope.select = (id) => {
		$scope.steppers.forEach((element) => {
			element.selected = false;
			if (element.idstepper == id) element.selected = true;
		});
	};

	$scope.save = model;

	function next(id) {
		$scope.steppers.forEach((element) => {
			element.selected = false;
			if (element.idstepper == id + 1) element.selected = true;
		});
		var tabName = '#tab' + (id + 1).toString();
		$('#myTab a[data-target="' + tabName + '"]').tab('show');
	}
}

function detailController($scope, $stateParams, $sce, ContentService) {
	ContentService.getById($stateParams.id).then((result) => {
		var info = angular.copy(result);
		info.content = $sce.trustAsHtml(info.content);
		$scope.model = info;
	});
}