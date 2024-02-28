import boto3
import subprocess


def main():

    aws_command = [
        'aws', 'ecs', 'execute-command',
        '--cluster', 'alpha-cluster',
        '--task', '',
        '--command', 'bash',
        '--interactive'
    ]

    try:
        subprocess.run(aws_command, capture_output=False, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")


if __name__ == "__main__":
    main()
