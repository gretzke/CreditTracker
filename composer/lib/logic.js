/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/** 
 * Transfer Mortgage ownership to another Institution
 * @param {org.dltcamp.credittracker.TransferMortgage} transferMortgage
 * @transaction
 */
async function TransferMortgage(transferMortgage) {
    // set new owner
    transferMortgage.mortgage.currentOwner = transferMortgage.newOwner;
    // commit change to ledger
    const assetRegistry = await getAssetRegistry('org.dltcamp.credittracker.Mortgage');
    await assetRegistry.update(transferMortgage.mortgage);
}

/** 
 * Transfer CDO ownership to another Institution
 * @param {org.dltcamp.credittracker.TransferCDO} transferCDO
 * @transaction
 */
async function transferCDO(transferCDO) {
    // set new owner
    transferCDO.cdo.owner = transferCDO.newOwner;
    for (var i = 0; i < transferCDO.cdo.mortgages.length; i++) {
        transferCDO.cdo.mortgages[i].currentOwner = transferCDO.newOwner;
    }
    // commit change to ledger
    const assetRegistry = await getAssetRegistry('org.dltcamp.credittracker.CDO');
    await assetRegistry.update(transferCDO.cdo);
}

/** 
 * Append another Mortgage to a CDO's list
 * @param {org.dltcamp.credittracker.AppendMortgageToCDO} appendMortgageToCDO
 * @transaction
 */
async function appendMortgageToCDO(appendMortgageToCDO) {
    appendMortgageToCDO.mortgage.cdo = appendMortgageToCDO.cdo;
    // append Mortgage
    appendMortgageToCDO.cdo.mortgages.push(appendMortgageToCDO.mortgage);
    // commit change to ledger
    const assetRegistryCDO = await getAssetRegistry('org.dltcamp.credittracker.CDO');
    await assetRegistryCDO.update(appendMortgageToCDO.cdo);
    const assetRegistryMortgage = await getAssetRegistry('org.dltcamp.credittracker.Mortgage');
    await assetRegistryMortgage.update(appendMortgageToCDO.mortgage);
}

/** 
 * Move Mortgages from one CDO's list into another CDO
 * @param {org.dltcamp.credittracker.MergeCDOs} mergeCDOs
 * @transaction
 */
async function mergeCDOs(mergeCDOs) {
    // TODO: check that owners of both CDOs are identical
    for (var i = 0; i < mergeCDOs.sourceCDO.mortgages.length; i++) {
        var mortgage = mergeCDOs.sourceCDO.mortgages.pop();
        mergeCDOs.targetCDO.mortgages.push(mortgage);
    }
    // commit change to ledger
    const assetRegistry = await getAssetRegistry('org.dltcamp.credittracker.CDO');
    await assetRegistry.update(mergeCDOs.targetCDO);
    await assetRegistry.update(mergeCDOs.sourceCDO);
}

/** 
 * Sum of morgage principals in the CDO's list
 * @param {org.dltcamp.credittracker.GetTotalPrincipal} getTotalPrincipal
 * @transaction
 */
/*async function getTotalPrincipal(getTotalPrincipal) {
    var totalPrincipal = 0;
    for (var i = 0; i < getTotalPrincipal.cdo.mortgages.length; i++) {
        totalPrincipal += getTotalPrincipal.cdo.mortgages[i].principal;
    }
    return totalPrincipal;
}*/

/**
 * Sample transaction
 * @param {org.dltcamp.credittracker.SampleTransaction} sampleTransaction
 * @transaction
 */
/* async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.dltcamp.credittracker.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.dltcamp.credittracker', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
*/