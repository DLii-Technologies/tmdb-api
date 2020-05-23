import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { list }                           from "../../src/core";
import { IResponse, IListCreateResponse } from "../../src/core/interface/response";
import { IListDetails, IListItemStatus }  from "../../src/core/interface/list";
import { StatusCode }                     from "../../src/core/enums";
import { IListResults }                   from "../../src/core/interface/results";

let listId      = 0;
let name        = "Test List";
let description = "A test list";

/**
 * @TODO
 */
describe("Core: List v3 API", () => {
	it("Create a list", () => {
		return list.create(auth.api_key, auth.session_id, name, description).then((result: IListCreateResponse) => {
			expect(listId = result.list_id).to.be.greaterThan(0);
		});
	});

	it("Get the account's created lists", () => {
		return Promise.all([
			list.getLists(auth.api_key, auth.session_id).then((result: IListResults) => {
				expect(result.total_results).to.be.greaterThan(0);
			}),
			list.getLists(auth.api_key, auth.session_id, auth.account_id).then((result: IListResults) => {
				expect(result.total_results).to.be.greaterThan(0);
			}),
		]);
	});

	it("Add a movie to a list", () => {
		return Promise.all([
			list.addMovie(auth.api_key, auth.session_id, listId, 245891).then((result: IResponse) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			}),
			list.addMovie(auth.api_key, auth.session_id, listId, 235).then((result: IResponse) => {
				expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
			})
		]);
	});

	it("Get list details", () => {
		return list.getDetails(auth.api_key, listId).then((result: IListDetails) => {
			expect(result.id).to.equal(listId.toString(), "ID doesn't match");
			expect(result.name).to.equal(name, "Name doesn't match");
			expect(result.description).to.equal(description, "Description doesn't match");
			expect(result.item_count).to.equal(2, "Item count doesn't match");
		});
	});

	it("Get list items status", () => {
		return Promise.all([
			list.getItemStatus(auth.api_key, listId, 245891).then((result: IListItemStatus) => {
				expect(result.item_present).to.equal(true, "Item is not present");
			}),
			list.getItemStatus(auth.api_key, listId, 235).then((result: IListItemStatus) => {
				expect(result.item_present).to.equal(true, "Item is not present");
			})
		]);
	});

	it("Remove a movie from a list", () => {
		return list.removeMovie(auth.api_key, auth.session_id, listId, 245891).then((result: IResponse) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});

	it("Get removed list items status", () => {
		return Promise.all([
			list.getItemStatus(auth.api_key, listId, 245891).then((result: IListItemStatus) => {
				expect(result.item_present).to.equal(false);
			}),
			list.getItemStatus(auth.api_key, listId, 235).then((result: IListItemStatus) => {
				expect(result.item_present).to.equal(true);
			})
		]);
	});

	it("Clear a list", () => {
		return list.clearList(auth.api_key, auth.session_id, listId).then((result: IResponse) => {
			expect(result.status_code).to.equal(StatusCode.RecordUpdateSuccess);
		});
	});

	it("Check list items", () => {
		return list.getItemStatus(auth.api_key, listId, 235).then((result: IListItemStatus) => {
			expect(result.item_present).to.equal(false);
		});
	});

	/**
	 * @WARNING
	 * Delete always throws an error even upon a successful delete.
	 * So an alternative successful check is added
	 *
	 * @TODO
	 * Skipping this test case until network is rewritten
	 */
	it.skip("Delete a list", (done) => {
		list.delete(auth.api_key, auth.session_id, listId).then((result: IResponse) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
			done();
		}).catch(function() {
			console.log("Error:", arguments);
			list.getDetails(auth.api_key, listId).catch((e: IResponse) => {
				expect(e.status_code).to.equal(StatusCode.NotFound);
			}).finally(done);
		});
	});
});
