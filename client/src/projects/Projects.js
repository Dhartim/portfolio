import React, { Component } from "react";
import { Button, Card, Container, Grid, Header, List, Responsive, Transition, Visibility } from "semantic-ui-react";
import Project from "./project/Project";

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = { projects: [], visible: false };
        this.flipCards = this.flipCards.bind(this);
    }

    flipCards() {
        this.setState({ visible: true });
    }

    componentDidMount() {
        fetch("/json/projects")
            .then(res => res.json())
            .then(projects => this.setState({projects}));
    }

    renderProject(project, i, isMobile) {
        return (
            <Project
                key={i}
                header={project.header}
                image={project.image}
                meta={project.meta}
                description={project.description}
                modalTarget={project.modalTarget}
                extra={project.extra}
                extraIcon={project.extraIcon}
                extraLink={project.extraLink}
                mobile={isMobile}/>
        );
    }
    renderModal(project, i) {
        return (
            <div key={i} id={project.modalTarget} className="custom-modal">
                <Grid padded centered doubling>
                    <Grid.Row className="modal-header" columns={3}>
                        <Grid.Column computer={3} only="tablet computer"/>
                        <Grid.Column computer={10} mobile={13} tablet={10}>
                            <Header color="blue" size="huge">{project.header}</Header>
                        </Grid.Column>
                        <Grid.Column width={3} textAlign="right">
                            <Button icon="close" color="blue" circular className={"close-" + project.modalTarget}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="modal-content stackable" columns={4}>
                        <Grid.Column width={3} only="tablet computer"/>
                        <Grid.Column computer={3} mobile={3} tablet={4}>
                            <Header color="blue" size="large">What Was Used</Header>
                            <List items={project.modalSkills}/>
                            <Header color="blue" size="large">What For</Header>
                            <p>{project.modalWhatFor}</p>
                        </Grid.Column>
                        <Grid.Column width={1} only="computer"/>
                        <Grid.Column width={6}>
                            <Header color="blue" size="medium">{project.modalSubheader}</Header>
                            {project.modalDescription.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                            <Header color="blue" size="large">See For Yourself</Header>
                            {project.modalButtons.map((button, i) => this.renderModalButton(button, i))}
                        </Grid.Column>
                        <Grid.Column width={3} only="tablet computer"/>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

    renderModalButton(button, i) {
        return (
            <Button key={i} href={button.link} icon={button.icon} content={button.name} size="large" color="grey" target="_blank"/>
        );
    }

    render() {
        return (
            <div id="projects">
                <Container>
                    <Visibility onBottomVisible={this.flipCards} once>
                        <Header>Projects</Header>
                    </Visibility>
                    <Transition animation="vertical flip" visible={this.state.visible} mountOnShow={false} duration={750}>
                        <Responsive {...Responsive.onlyComputer} as={Card.Group} itemsPerRow={3} centered textAlign="left" stackable>
                            {this.state.projects.map((project, i) => this.renderProject(project, i, false))}
                        </Responsive>
                    </Transition>
                    <Transition animation="vertical flip" visible={this.state.visible} mountOnShow={false} duration={750}>
                        <Responsive maxWidth={767} as={Card.Group} itemsPerRow={3} centered textAlign="left" stackable>
                            {this.state.projects.map((project, i) => this.renderProject(project, i, true))}
                        </Responsive>
                    </Transition>
                    {this.state.projects.map((project, i) => this.renderModal(project, i))}
                </Container>
            </div>
        );
    }
}

export default Projects;