/*##########################################################################
#
# Interfaces
#
############################################################################ */

export interface ServiceWorkflow {
  run(
    request: ExternalPlaceholderRequest<any>
  ): Promise<ExternalPlaceholderResponse<any, any>>;
}

/**
 * Object that is send to the external api.
 */
export interface ExternalAPIRequest {}

/**
 * Object that is received from the external api.
 */
export interface ExternalAPIResponse {
  /**
   * The error field can be provided, in order
   * to inform the voice designer about configuration errors
   * or processing errors.
   */
  error?: {
    message: string;
  };
}

/**
 * An external placeholder filler request describes the json object which
 * is send by an external action to a remote web hook which implements
 * the external placeholder filler action.
 */
export interface ExternalPlaceholderRequest<T> extends ExternalAPIRequest {
  /**
   * Provides information about the current context,
   * that is related to the current conversation between the voice-cms
   * and an end user.
   */
  context: {
    request?: any;
    sessionId: string;
    dialogId: string;
  };

  /**
   * A map of input parameters created by the voice designer.
   */
  input: T;
}

/**
 * An external ExternalPlaceholderResponse contains the result from a external api call to the `vcms`,
 * this response is a simple json object, that can contains output properties and a `choice` literal.
 *
 * The output properties will be mapped by the voice designer into the session of a called dialog.
 * Choices are strings literals, that are mapped by the voice designer to the successor node.
 *
 */

export interface ExternalPlaceholderResponse<TChoice, TOutput>
  extends ExternalAPIResponse {
  /**
   * A string literal that is mapped by the voice designer to the successor node.
   * This can be used to branch the dialog depending on an API call result.
   */
  choice: TChoice;

  /**
   * The output properties, that can be mapped by the voice designer into the session.
   */
  output?: TOutput;
}
