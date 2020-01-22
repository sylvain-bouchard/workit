/*!
 * Copyright (c) 2019 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import debug = require('debug');
import { injectable, unmanaged } from 'inversify';
import 'reflect-metadata';
import {
  ICreateWorkflowInstance,
  ICreateWorkflowInstanceResponse,
  IDeployment,
  IDeploymentResource,
  IDeployWorkflowResponse,
  IPagination,
  IPaginationOptions,
  IPublishMessage,
  IUpdateWorkflowRetry,
  IUpdateWorkflowVariables,
  IWorkflow,
  IWorkflowClient,
  IWorkflowDefinition,
  IWorkflowDefinitionRequest,
  IWorkflowOptions
} from 'workit-types';

const log = debug('workit:clientManager');
@injectable()
export abstract class ClientManager<TClient extends IWorkflowClient> implements IWorkflowClient {
  protected readonly _client: TClient;
  constructor(@unmanaged() client: TClient) {
    this._client = client;
  }
  public deployWorkflow(bpmnPath: string): Promise<IDeployWorkflowResponse> {
    log(`Deploying workflow from path: "${bpmnPath}"`);
    return this._client.deployWorkflow(bpmnPath);
  }
  public getWorkflows(options?: Partial<IWorkflowOptions & IPaginationOptions>): Promise<IPagination<IWorkflow>> {
    log(`Getting workflows`);
    return this._client.getWorkflows(options);
  }
  public getWorkflow(payload: IWorkflowDefinitionRequest): Promise<IWorkflowDefinition> {
    return this._client.getWorkflow(payload);
  }
  /**
   * Notice that you cannot pass "File" in variables for now.
   */
  public updateVariables(payload: IUpdateWorkflowVariables): Promise<void> {
    return this._client.updateVariables(payload);
  }
  public async updateJobRetries(payload: IUpdateWorkflowRetry): Promise<void> {
    await this._client.updateJobRetries(payload);
  }
  public publishMessage<T, K>(payload: IPublishMessage<T, K>): Promise<void> {
    return this._client.publishMessage(payload);
  }
  public createWorkflowInstance<T>(model: ICreateWorkflowInstance<T>): Promise<ICreateWorkflowInstanceResponse> {
    return this._client.createWorkflowInstance(model);
  }
  public resolveIncident(incidentKey: string): Promise<void> {
    return this._client.resolveIncident(incidentKey);
  }
  public cancelWorkflowInstance(instanceId: string): Promise<void> {
    return this._client.cancelWorkflowInstance(instanceId);
  }
  public async getDeployments(): Promise<IDeployment[]> {
    return this._client.getDeployments();
  }
  public async getDeploymentResourceList(deploymentId: string): Promise<IDeploymentResource[]> {
    return this._client.getDeploymentResourceList(deploymentId);
  }
  public async getDeploymentResource(deploymentId: string, resourceId: string): Promise<Buffer> {
    return this._client.getDeploymentResource(deploymentId, resourceId);
  }
  public async deleteDeployment(deploymentId: string): Promise<void> {
    return this._client.deleteDeployment(deploymentId);
  }
}
