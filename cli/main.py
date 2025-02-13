import argparse
import subprocess

import boto3

def parse_args():
    parser = argparse.ArgumentParser(description="")

    parser.add_argument(
        "--base_env_name",
        type=str,
        required=True,
        default=None,
        help="Path to the R1 file"
    )

    parser.add_argument(
        "--app_env_name",
        type=str,
        required=True,
        default=None,
        help="Number of threads to use"
    )

    args = parser.parse_args()
    return args


def main():
    """
    This command is used to get access to a running container with ecs-exec

    This command should be IaC agnostic, so instead of using stack outputs
    it will use tags to get resources

    Items to look up via tags

    * cluster name
    * task id

    arguments:

    * base_env_name
    * app_env_name
    """

    args = parse_args()

    # use args to look up ecs cluster name
    # base_env_name = args.base_env_name
    app_env_name = args.app_env_name

    # use aws cli get the ecs cluster name with tags app-env = app_env_name and base-env = base_env_name
    cluster_name = f"{app_env_name}-cluster"

    ecs_client = boto3.client("ecs", region_name="us-east-1")
    task_id = ecs_client.list_tasks(cluster=cluster_name, serviceName=f"{app_env_name}-gunicorn")["taskArns"][0]

    print(f"Task ID: {task_id}")

    aws_command = [
        'aws', 'ecs', 'execute-command',
        '--cluster', cluster_name,
        '--task', task_id,
        '--command', 'bash',
        '--interactive', '--region', 'us-east-1'
    ]

    try:
        subprocess.run(aws_command, capture_output=False, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")


if __name__ == "__main__":
    main()
